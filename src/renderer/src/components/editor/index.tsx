import { JSX } from 'react'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import OfineEditorCore from './core'
import theme from './theme'

import './editor.css'
import supportNodes from './node'

const editorConfig = {
  // NOTE: This is critical for collaboration plugin to set editor state to null. It
  // would indicate that the editor should not try to set any default state
  // (not even empty one), and let collaboration plugin do it instead
  editorState: null,
  namespace: 'React.js Collab Demo',
  nodes: supportNodes,
  // Handling of errors during update
  onError(error: Error) {
    throw error
  },
  // The editor theme
  theme: theme
}

const OfineEditor = (): JSX.Element => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <OfineEditorCore />
    </LexicalComposer>
  )
}

export default OfineEditor
