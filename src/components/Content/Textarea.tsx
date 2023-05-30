import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

type Props = {
  setTextareaText: React.Dispatch<React.SetStateAction<string>>;
  textareaText: string;
  placeholder: string;
};

const Textarea = ({ setTextareaText, textareaText, placeholder }: Props) => {
  return (
    <div className="editor">
      {!textareaText && (
        <i
          style={{
            position: 'absolute',
            left: '2.5rem',
            top: '5.8rem',
            zIndex: 1,
            pointerEvents: 'none',
            opacity: 0.5,
          }}
        >
          {placeholder}
        </i>
      )}
      <CKEditor
        editor={ClassicEditor}
        data={textareaText}
        onChange={(event, editor) => {
          const data = editor.getData();
          setTextareaText(data);
        }}
      />
    </div>
  );
};

export default Textarea;
