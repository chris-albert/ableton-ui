type KeyOf<T extends object> = Extract<keyof T, string>;

type ObjectPathItem = {
  type: 'objectKey',
  path: string
}

const objectPathItem = (path: string): ObjectPathItem => ({
  type: 'objectKey',
  path
})

type ArrayPathItem = {
  type: 'arrayIndex',
  path: number
}

const arrayPathItem = (path: number): ArrayPathItem => ({
  type: 'arrayIndex',
  path
})

type PathItem = ObjectPathItem | ArrayPathItem

type Path = Array<PathItem>

const appendPath = (path: Path, pathItem: PathItem): Path => {
  return [...path, pathItem]
}

export type EventRead<Value> = {
  value: Value
}

export type EventWrite<Value> = {
  set: (f: (v: Value) => Value) => void
}

export type EventState<Value> = {
  path: Path
  focus: <Key extends (keyof Value & string)>(key: Key) => EventState<Value[Key]>
}

export const eventState = <Value>(path: Path): EventState<Value> => {

  const focus = <Key extends (keyof Value & string) >(key: Key): EventState<Value[Key]> =>
    eventState(appendPath(path, objectPathItem(key.toString())))

  return { focus, path }
}

export const eventStateArray = <Value>(eventState: EventState<Array<Value>>): Array<EventState<Value>> => {

  throw new Error
}

type EventValue<Value> = Value
type EventSet<Value> = (f: (v: Value) => Value) => void

export type EventStateHook<Value> = [EventValue<Value>, EventSet<Value>]

export const useEventState = <Value>(state: EventState<Value>): EventStateHook<Value> => {

  throw new Error
}
