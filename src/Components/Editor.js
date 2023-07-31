import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaBold, FaItalic, FaUnderline, FaLink, FaListOl, FaListUl } from 'react-icons/fa';

const Editor = ({ content, onSave }) => {
  const [editorContent, setEditorContent] = useState(content);
  const [selectedText, setSelectedText] = useState('');
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const quillRef = useRef();

  useEffect(() => {
    const editor = quillRef.current.getEditor();
  
    const handleTextSelection = () => {
      const selection = editor.getSelection();
      setSelectedText(selection ? editor.getText(selection.index, selection.length) : '');
      setToolbarVisible(!!selection && selection.length > 0); 
  
      if (selection) {
        const range = window.getSelection().getRangeAt(0); 
        if (range) {
          const rect = range.getBoundingClientRect();
          setToolbarPosition({
            x: rect.x + window.pageXOffset,
            y: rect.y + rect.height + window.pageYOffset,
          });
        }
      }
    };
  
    editor.on('selection-change', handleTextSelection);
  
    return () => {
      editor.off('selection-change', handleTextSelection);
    };
  }, []);
  

  const handleSave = () => {
    onSave(editorContent);
  };

  const handleLink = () => {
    const link = prompt('Enter the URL:');
    if (link) {
      quillRef.current.getEditor().format('link', link);
    }
  };

  const handleOrderedList = () => {
    quillRef.current.getEditor().format('list', 'ordered', true);
  };

  const handleUnorderedList = () => {
    quillRef.current.getEditor().format('list', 'bullet', true);
  };

  const handleFormat = (format, value) => {
    quillRef.current.getEditor().format(format, value);
  };

  return (
    <div>
      <ReactQuill
        value={editorContent}
        onChange={setEditorContent}
        style={{
          height: '550px',
          border: 'solid 2px black',
          width: '1000px',
          marginTop: '35px',
        }}
        modules={{
          toolbar: false, 
        }}
        ref={quillRef}
      />
      {toolbarVisible && (
        <div className="custom-toolbar btn-group" role="group" style={{ position: 'absolute', top: toolbarPosition.y, left: toolbarPosition.x, zIndex: 1 }}>
          <button type="button" className="btn btn-dark" onClick={() => handleFormat('bold', true)}>
            <FaBold />
          </button>
          <button type="button" className="btn btn-dark" onClick={() => handleFormat('italic', true)}>
            <FaItalic />
          </button>
          <button type="button" className="btn btn-dark" onClick={() => handleFormat('underline', true)}>
            <FaUnderline />
          </button>
          <button type="button" className="btn btn-dark" onClick={handleLink}>
            <FaLink />
          </button>
          <button type="button" className="btn btn-dark" onClick={handleOrderedList}>
            <FaListOl />
          </button>
          <button type="button" className="btn btn-dark" onClick={handleUnorderedList}>
            <FaListUl />
          </button>
        </div>
      )}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Editor;
