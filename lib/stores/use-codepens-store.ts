import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"
import { codepens as initialCodepens } from "@/lib/configs/codepens"
import type { CodePen } from "@/lib/types"

// Convert initial codepens to match the new schema
const convertedInitialCodepens: CodePen[] = initialCodepens.map((codepen) => ({
  ...codepen,
  id: uuidv4(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}))

interface CodepensState {
  codepens: CodePen[]
  addCodepen: (codepen: Omit<CodePen, "id" | "createdAt" | "updatedAt">) => void
  updateCodepen: (id: string, updatedCodepen: Partial<CodePen>) => void
  deleteCodepen: (id: string) => void
  getCodepenById: (id: string) => CodePen | undefined
  getCodepenByTitle: (title: string) => CodePen | undefined
}

export const useCodepensStore = create<CodepensState>()(
  persist(
    (set, get) => ({
      codepens: convertedInitialCodepens,

      addCodepen: (codepenInput) => {
        const newCodepen: CodePen = {
          ...codepenInput,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set((state) => ({
          codepens: [...state.codepens, newCodepen],
        }))
      },

      updateCodepen: (id, updatedCodepenInput) => {
        set((state) => ({
          codepens: state.codepens.map((codepen) =>
            codepen.id === id
              ? {
                  ...codepen,
                  ...updatedCodepenInput,
                  updatedAt: new Date().toISOString(),
                }
              : codepen,
          ),
        }))
      },

      deleteCodepen: (id) => {
        set((state) => ({
          codepens: state.codepens.filter((codepen) => codepen.id !== id),
        }))
      },

      getCodepenById: (id) => {
        return get().codepens.find((codepen) => codepen.id === id)
      },

      getCodepenByTitle: (title) => {
        return get().codepens.find((codepen) => codepen.title === title)
      },
    }),
    {
      name: "codepens-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

