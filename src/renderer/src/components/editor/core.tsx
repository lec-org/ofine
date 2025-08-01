import { JSX } from 'react'

import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'

import Placeholder from './placeholder'

const OfineEditorCore = (): JSX.Element => {
  return (
    <div className="ofine-editor-container">
      <div className="ofine-editor-inner">
        <RichTextPlugin
          contentEditable={<ContentEditable className="ofine-editor-content" />}
          placeholder={Placeholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin />
        <AutoFocusPlugin />
      </div>
    </div>
  )
}

export default OfineEditorCore
