import Reconciler, { OpaqueHandle } from 'react-reconciler'
import ReactReconciler from 'react-reconciler'
import { Color } from '../components/controllers/Color'
import {
  ControllerPadTarget,
  emptyController,
  messageToKey,
  targetToKey,
} from '../model/controllers/Controller'
import _ from 'lodash'
import { Controller as ControllerModel } from '../model/controllers/Controller'
import { MidiMessage } from '../midi/WindowMidi'

const log = false ? console.log : () => {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      pad: PadProps
      controller: ControllerProps
    }
  }
}

type PadProps = {
  color: Color
  target: ControllerPadTarget
  onClick?: () => void
  key?: string
}

type ControllerProps = {
  children: Array<Pad> | Pad | null
  model: ControllerModel
}

type Pad = {
  type: 'pad'
  props: PadProps
}

type Controller = {
  type: 'controller'
  props: ControllerProps
}

type Type = 'pad' | 'controller'
type Props = PadProps | ControllerProps
type Container = {
  root: Controller | undefined
}

type Instance = Pad | Controller

type TextInstance = never
type ChildSet = unknown
type PublicInstance = unknown
type HostContext = {
  model: ControllerModel | undefined
}
type TimeoutHandle = unknown
type UpdatePayload = Instance
type SuspenseInstance = unknown

const GlobalControllerManager = () => {
  let controller: ControllerModel = emptyController

  return {
    get() {
      return controller
    },
    set(c: ControllerModel) {
      controller = c
      controller.init()
      controller.clear()
    },
  }
}

const GlobalController = GlobalControllerManager()

const PadUpdatesManager = () => {
  let updates: Array<PadProps> = []

  return {
    add(pad: PadProps) {
      updates.push(pad)
    },
    get(): Array<PadProps> {
      return updates
    },
    clear() {
      updates = []
    },
  }
}

const PadUpdates = PadUpdatesManager()

const commit = (instance: Instance) => {
  if (instance.type === 'pad') {
    PadUpdates.add(instance.props)
  } else if (instance.type === 'controller') {
    log('Commit All', PadUpdates.get())
    GlobalController.get().render(PadUpdates.get())
    PadUpdates.clear()
  }
}

const typeInstance = (type: Type, props: Props): Instance => {
  if (type === 'pad') {
    return {
      type: 'pad',
      props: props as PadProps,
    }
  } else if (type === 'controller') {
    return {
      type: 'controller',
      props: props as ControllerProps,
    }
  } else {
    throw new Error(`Invalid React MIDI node ${type}`)
  }
}

const ListenersManager = () => {
  const listeners: Record<string, () => void> = {}

  return {
    add(target: ControllerPadTarget, f: () => void) {
      const key = targetToKey(target)
      listeners[key] = f
    },
    on(message: MidiMessage) {
      const key = messageToKey(message)
      const list = listeners[key]
      if (list !== undefined) {
        list()
      }
    },
  }
}

const Listeners = ListenersManager()

const initInstance = (instance: Instance) => {
  if (instance.type === 'controller') {
    GlobalController.set(instance.props.model)
    GlobalController.get().on(Listeners.on)
  } else if (instance.type === 'pad') {
    if (instance.props.onClick !== undefined) {
      Listeners.add(instance.props.target, instance.props.onClick)
    }
  }
}

const instance = Reconciler({
  createInstance(
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: ReactReconciler.OpaqueHandle,
  ): Instance {
    log('createInstance', type, props, rootContainer, hostContext, internalHandle)
    const instance = typeInstance(type, props)
    initInstance(instance)
    return instance
  },

  createTextInstance(
    text: string,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: ReactReconciler.OpaqueHandle,
  ): TextInstance {
    throw new Error('ReactMidi does not support text instances.')
  },

  appendChild(parentInstance: Instance, child: Instance | TextInstance): void {
    log('appendChild', parentInstance, child)
  },

  appendChildToContainer(container: Container, child: Instance | TextInstance): void {
    log('appendChildToContainer', container, child)
    if (child.type === 'controller') {
      container.root = child
    }
  },

  appendChildToContainerChildSet(childSet: ChildSet, child: Instance | TextInstance): void {
    log('appendChildToContainerChildSet', childSet, child)
  },

  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void {
    log('appendInitialChild', parentInstance, child)
  },

  getChildHostContext(parentHostContext: HostContext, type: Type, rootContainer: Container): HostContext {
    log('getChildHostContext', parentHostContext, type, rootContainer)
    return parentHostContext
  },

  finalizeContainerChildren(container: Container, newChildren: ChildSet): void {
    log('finalizeContainerChildren')
  },

  finalizeInitialChildren(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
  ): boolean {
    log('finalizeInitialChildren', instance, type, props, rootContainer, hostContext)
    return true
  },

  prepareUpdate(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props,
    rootContainer: Container,
    hostContext: HostContext,
  ): UpdatePayload | null {
    log('prepareUpdate', instance, type, oldProps, newProps, rootContainer, hostContext)
    if (!_.isEqual(oldProps, newProps)) {
      return typeInstance(type, newProps)
    } else {
      return null
    }
  },

  commitUpdate(
    instance: Instance,
    updatePayload: UpdatePayload,
    type: Type,
    prevProps: Props,
    nextProps: Props,
    internalHandle: OpaqueHandle,
  ): void {
    log('commitUpdate', instance, updatePayload, type, prevProps, nextProps)
    commit(updatePayload)
  },

  commitMount(instance: Instance, type: Type, props: Props, internalInstanceHandle: OpaqueHandle): void {
    log('commitMount', instance, type, props)
    commit(instance)
  },

  /**
   * Stuff below here we don't need to worry about
   */
  cancelTimeout(id: TimeoutHandle): void {},

  detachDeletedInstance(node: Instance): void {},
  getInstanceFromScope(scopeInstance: any): null | Instance {
    return null
  },
  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    log('getPublicInstance')
    return undefined
  },
  getRootHostContext(rootContainer: Container): HostContext | null {
    if (rootContainer.root !== undefined) {
      return { model: rootContainer.root.props.model }
    } else {
      return null
    }
  },
  isPrimaryRenderer: false,
  noTimeout: undefined,
  prepareForCommit(containerInfo: Container): Record<string, any> | null {
    return null
  },
  preparePortalMount(containerInfo: Container): void {},

  resetAfterCommit(containerInfo: Container): void {},
  scheduleTimeout(fn: (...args: unknown[]) => unknown, delay: number | undefined): TimeoutHandle {
    return undefined
  },
  shouldSetTextContent(type: Type, props: Props): boolean {
    return false
  },
  supportsHydration: true,
  supportsMutation: true,
  supportsPersistence: true,
  afterActiveInstanceBlur(): void {},
  beforeActiveInstanceBlur(): void {},
  getCurrentEventPriority(): ReactReconciler.Lane {
    // @ts-ignore
    return undefined
  },
  getInstanceFromNode(node: any): ReactReconciler.Fiber | null | undefined {
    return undefined
  },
  prepareScopeUpdate(scopeInstance: any, instance: any): void {},
  clearContainer(container: Container): void {},
  removeChildFromContainer(container: Container, child: Instance | TextInstance | SuspenseInstance): void {},
})

export const MidiReconciler = {
  instance,
}
