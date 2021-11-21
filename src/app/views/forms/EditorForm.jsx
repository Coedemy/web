import React, { useState } from 'react'
import { RichTextEditor, Breadcrumb } from 'app/components'

const EditorForm = () => {
	const [content, setContent] = useState('')

	return (
		<div className="m-sm-30">
			<div className="mb-sm-30">
				<Breadcrumb
					routeSegments={[
						{ name: 'Forms', path: '/forms' },
						{ name: 'Editor' },
					]}
				/>
			</div>
			<RichTextEditor
				content={content}
				handleContentChange={(content) => setContent(content)}
				placeholder="insert text here..."
			/>
		</div>
	)
}

export default EditorForm
