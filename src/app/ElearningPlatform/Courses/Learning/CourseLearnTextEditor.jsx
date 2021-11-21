import 'react-quill/dist/quill.snow.css'
import React from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  editor: {
    '& .ql-container': {
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
      '& p,code': {
        fontSize: 16,
      },
    },
    '& .ql-toolbar': {
      background: 'white',
      borderBottom: 'none',
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
    },
  },
}))

const CourseLearnTextEditor = ({ content, placeholder, handleContentChange }) => {
  const classes = useStyles()

  return (
    <ReactQuill
      className={classes.editor}
      theme="snow"
      onChange={handleContentChange}
      value={content}
      modules={CourseLearnTextEditor.modules}
      formats={CourseLearnTextEditor.formats}
      placeholder={placeholder}
    />
  )
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
CourseLearnTextEditor.modules = {
  toolbar: [
    ['bold', 'italic'], 
    ['code-block', 'link'],
    ['image']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  },
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
CourseLearnTextEditor.formats = [
  'align',
  'background',
  'bold',
  'blockquote',
  'bullet',
  'color',
  'code',
  'code-block',
  'clean',
  'direction',
  'header',
  'italic',
  'indent',
  'image',
  'list',
  'link',
  'size',
  'strike',
  'script',
  'underline',
  'video',
]

/*
 * PropType validation
 */
CourseLearnTextEditor.propTypes = {
  placeholder: PropTypes.string,
}

export default CourseLearnTextEditor
