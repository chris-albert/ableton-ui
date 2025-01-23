import Reconciler from 'react-reconciler'
import ReactReconciler from 'react-reconciler'

type Instance = unknown
type SuspenseInstance = unknown
type TextInstance = unknown
type ChildSet = unknown
type HydratableInstance = unknown
type PublicInstance = unknown
type HostContext = unknown
type TimeoutHandle = unknown
type UpdatePayload = unknown

const instance = Reconciler({
  appendChild<Instance, TextInstance>(parentInstance: Instance, child: Instance | TextInstance): void {},
  appendChildToContainer<Container, Instance, TextInstance>(
    container: Container,
    child: Instance | TextInstance,
  ): void {},
  appendChildToContainerChildSet<ChildSet, Instance, TextInstance>(
    childSet: ChildSet,
    child: Instance | TextInstance,
  ): void {},
  appendInitialChild<Instance, TextInstance>(
    parentInstance: Instance,
    child: Instance | TextInstance,
  ): void {},
  canHydrateInstance<HydratableInstance, Type, Props>(
    instance: HydratableInstance,
    type: Type,
    props: Props,
  ): null | Instance {
    return undefined
  },
  canHydrateSuspenseInstance<HydratableInstance>(instance: HydratableInstance): null | SuspenseInstance {
    return undefined
  },
  canHydrateTextInstance<HydratableInstance>(
    instance: HydratableInstance,
    text: string,
  ): null | TextInstance {
    return undefined
  },
  cancelTimeout<TimeoutHandle>(id: TimeoutHandle): void {},
  clearContainer<Container>(container: Container): void {},
  cloneHiddenInstance<Instance, Type, Props>(
    instance: Instance,
    type: Type,
    props: Props,
    internalInstanceHandle: ReactReconciler.OpaqueHandle,
  ): Instance {
    // @ts-ignore
    return undefined
  },
  cloneHiddenTextInstance<Instance, Type>(
    instance: Instance,
    text: Type,
    internalInstanceHandle: ReactReconciler.OpaqueHandle,
  ): TextInstance {
    return undefined
  },
  cloneInstance<Instance, UpdatePayload, Type, Props>(
    instance: Instance,
    updatePayload: UpdatePayload,
    type: Type,
    oldProps: Props,
    newProps: Props,
    internalInstanceHandle: ReactReconciler.OpaqueHandle,
    keepChildren: boolean,
    recyclableInstance: null | Instance,
  ): Instance {
    // @ts-ignore
    return undefined
  },
  commitHydratedContainer<Container>(container: Container): void {},
  commitHydratedSuspenseInstance<SuspenseInstance>(suspenseInstance: SuspenseInstance): void {},
  commitMount<Instance, Type, Props>(
    instance: Instance,
    type: Type,
    props: Props,
    internalInstanceHandle: ReactReconciler.OpaqueHandle,
  ): void {},
  commitTextUpdate<TextInstance>(textInstance: TextInstance, oldText: string, newText: string): void {},
  commitUpdate<Instance, UpdatePayload, Type, Props>(
    instance: Instance,
    updatePayload: UpdatePayload,
    type: Type,
    prevProps: Props,
    nextProps: Props,
    internalHandle: ReactReconciler.OpaqueHandle,
  ): void {},
  createContainerChildSet<Container>(container: Container): ChildSet {
    return undefined
  },
  createInstance<Type, Props, Container, HostContext>(
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: ReactReconciler.OpaqueHandle,
  ): Instance {
    return undefined
  },
  createTextInstance<Container, HostContext>(
    text: string,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: ReactReconciler.OpaqueHandle,
  ): TextInstance {
    return undefined
  },
  detachDeletedInstance<Instance>(node: Instance): void {},
  didNotFindHydratableContainerInstance<Container, Type, Props>(
    parentContainer: Container,
    type: Type,
    props: Props,
  ): void {},
  didNotFindHydratableContainerSuspenseInstance<Container>(parentContainer: Container): void {},
  didNotFindHydratableContainerTextInstance<Container>(parentContainer: Container, text: string): void {},
  didNotFindHydratableInstance<Type, Props, Instance>(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
    type: Type,
    props: Props,
  ): void {},
  didNotFindHydratableSuspenseInstance<Type, Props, Instance>(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
  ): void {},
  didNotFindHydratableTextInstance<Type, Props, Instance>(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
    text: string,
  ): void {},
  didNotHydrateContainerInstance<Container, HydratableInstance>(
    parentContainer: Container,
    instance: HydratableInstance,
  ): void {},
  didNotHydrateInstance<Type, Props, Instance, HydratableInstance>(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
    instance: HydratableInstance,
  ): void {},
  didNotMatchHydratedContainerTextInstance<Container, TextInstance>(
    parentContainer: Container,
    textInstance: TextInstance,
    text: string,
  ): void {},
  didNotMatchHydratedTextInstance<Type, Props, Instance, TextInstance>(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
    textInstance: TextInstance,
    text: string,
  ): void {},
  errorHydratingContainer<Container>(parentContainer: Container): void {},
  finalizeContainerChildren<Container, ChildSet>(container: Container, newChildren: ChildSet): void {},
  finalizeInitialChildren<Instance, Type, Props, Container, HostContext>(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
  ): boolean {
    return false
  },
  getChildHostContext<HostContext, Type, Container>(
    parentHostContext: HostContext,
    type: Type,
    rootContainer: Container,
  ): HostContext {
    // @ts-ignore
    return undefined
  },
  getFirstHydratableChild<Container, Instance>(
    parentInstance: Container | Instance,
  ): null | HydratableInstance {
    return undefined
  },
  getInstanceFromScope(scopeInstance: any): null | Instance {
    return undefined
  },
  getNextHydratableInstanceAfterSuspenseInstance<SuspenseInstance>(
    suspenseInstance: SuspenseInstance,
  ): null | HydratableInstance {
    return undefined
  },
  getNextHydratableSibling<HydratableInstance>(instance: HydratableInstance): null | HydratableInstance {
    // @ts-ignore
    return undefined
  },
  getParentSuspenseInstance(targetInstance: any): null | SuspenseInstance {
    return undefined
  },
  getPublicInstance<Instance, TextInstance>(instance: Instance | TextInstance): PublicInstance {
    return undefined
  },
  getRootHostContext<Container>(rootContainer: Container): HostContext | null {
    return undefined
  },
  hideInstance<Instance>(instance: Instance): void {},
  hideTextInstance<TextInstance>(textInstance: TextInstance): void {},
  hydrateInstance<Instance, Type, Props, Container, HostContext>(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainerInstance: Container,
    hostContext: HostContext,
    internalInstanceHandle: any,
  ): any[] | null {
    // @ts-ignore
    return undefined
  },
  hydrateSuspenseInstance<SuspenseInstance>(
    suspenseInstance: SuspenseInstance,
    internalInstanceHandle: any,
  ): void {},
  hydrateTextInstance<TextInstance>(
    textInstance: TextInstance,
    text: string,
    internalInstanceHandle: any,
  ): boolean {
    return false
  },
  insertBefore<Instance, TextInstance, SuspenseInstance>(
    parentInstance: Instance,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance | SuspenseInstance,
  ): void {},
  insertInContainerBefore<Container, Instance, TextInstance, SuspenseInstance>(
    container: Container,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance | SuspenseInstance,
  ): void {},
  isPrimaryRenderer: false,
  isSuspenseInstanceFallback<SuspenseInstance>(instance: SuspenseInstance): boolean {
    return false
  },
  isSuspenseInstancePending<SuspenseInstance>(instance: SuspenseInstance): boolean {
    return false
  },
  noTimeout: undefined,
  prepareForCommit<Container>(containerInfo: Container): Record<string, any> | null {
    // @ts-ignore
    return undefined
  },
  preparePortalMount<Container>(containerInfo: Container): void {},
  prepareUpdate<Instance, Type, Props, Container, HostContext>(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props,
    rootContainer: Container,
    hostContext: HostContext,
  ): UpdatePayload | null {
    return undefined
  },
  registerSuspenseInstanceRetry<SuspenseInstance>(instance: SuspenseInstance, callback: () => void): void {},
  removeChild<Instance, TextInstance, SuspenseInstance>(
    parentInstance: Instance,
    child: Instance | TextInstance | SuspenseInstance,
  ): void {},
  removeChildFromContainer<Container, Instance, TextInstance, SuspenseInstance>(
    container: Container,
    child: Instance | TextInstance | SuspenseInstance,
  ): void {},
  replaceContainerChildren<Container, ChildSet>(container: Container, newChildren: ChildSet): void {},
  resetAfterCommit<Container>(containerInfo: Container): void {},
  resetTextContent<Instance>(instance: Instance): void {},
  scheduleTimeout(fn: (...args: unknown[]) => unknown, delay: number | undefined): TimeoutHandle {
    return undefined
  },
  shouldSetTextContent<Type, Props>(type: Type, props: Props): boolean {
    return false
  },
  supportsHydration: false,
  supportsMutation: false,
  supportsPersistence: false,
  unhideInstance<Instance, Props>(instance: Instance, props: Props): void {},
  unhideTextInstance<TextInstance>(textInstance: TextInstance, text: string): void {},
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
})

export const MidiRconciler = {
  instance,
}
