import Reconciler, { OpaqueHandle } from 'react-reconciler'
import ReactReconciler from 'react-reconciler'
import { Color } from '../components/controllers/Color'
import { ControllerPadTarget } from '../model/controllers/Controller'
import _ from 'lodash'
import { Controller as ControllerModel } from '../model/controllers/Controller'

const log = true ? console.log : () => {}

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
}

type ControllerProps = {
  children: Array<Pad>
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
type UpdatePayload = unknown
type SuspenseInstance = unknown

const instance = Reconciler({
  createInstance(
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: ReactReconciler.OpaqueHandle,
  ): Instance {
    log('createInstance', type, props, rootContainer, hostContext, internalHandle)
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
      return newProps
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
  },

  commitMount(instance: Instance, type: Type, props: Props, internalInstanceHandle: OpaqueHandle): void {
    log('commitMount', instance, type, props)
    if (instance.type === 'pad') {
    }
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
  isPrimaryRenderer: true,
  noTimeout: undefined,
  prepareForCommit(containerInfo: Container): Record<string, any> | null {
    log('prepareForCommit', containerInfo)
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
