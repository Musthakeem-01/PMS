import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = () => {
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Rich Text Editor</h1>
      <Editor
        apiKey='8wuk2rv5omhkdc6l1olhzmwnb3xci5nj9fa0f2c9xiv7fse0'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="Words not enough? Type : to add emoji. 😍"
        init={{
          height: 300,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount emoticons'
          ],
          toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image customEmoji | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          statusbar: false,
          setup: function(editor) {
            editor.ui.registry.addButton('customEmoji', {
              text: 'Emoji',
              onAction: function() {
                editor.execCommand('mceInsertEmoticon');
              }
            });

            editor.on('keydown', function(e) {
              if (e.key === ':') {
                editor.execCommand('mceInsertEmoticon');
                e.preventDefault();
              }
            });
          }
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default RichTextEditor;
