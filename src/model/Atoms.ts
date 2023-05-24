import {atom, PrimitiveAtom, useAtom, useSetAtom} from "jotai";
import {emptyProject, Step} from "./Project";
import { focusAtom } from 'jotai/optics'
import { splitAtom } from 'jotai/utils'
import {OpticFor} from "optics-ts";
import { atomWithStorage } from 'jotai/utils'
import {atomWithMachine} from "jotai-xstate";
import {TransportMachine} from "./Transport";

export const loggingAtom = <Value,>(baseAtom: PrimitiveAtom<Value>): PrimitiveAtom<Value> =>
  atom(
    (get) => get(baseAtom),
    (get, set, action) => {
      // set(baseAtom, reducer(get(baseAtom), action))
      const g = get(baseAtom)
      console.log(`Hi im setting ... ${baseAtom}`, action)
      set(baseAtom, action)
    }
  )

const localProjectAtom = atomWithStorage('project', emptyProject())

export const projectAtom = localProjectAtom

export const tracksAtom = focusAtom(projectAtom, optic => optic.prop('tracks'))
export const tracksAtomsAtom = splitAtom(tracksAtom)

export const stepToOn = (s: OpticFor<Step>) => s.prop('on')

export const useStepOnFocus = (step: PrimitiveAtom<Step>) =>
  useAtom(focusAtom(step, stepToOn))

export const transportMachineAtom = atomWithMachine(TransportMachine)

// export const transportBarsAtom = focusAtom(transportMachineAtom, optic => optic.prop('bars'))