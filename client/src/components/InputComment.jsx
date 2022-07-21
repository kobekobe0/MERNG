import React from 'react'

function InputComment() {
    return (
        <div className="mt-3 border rounded-md p-3">
            <form action="submit" className="flex justify-end items-end">
                <div className="w-full">
                    <label htmlFor="comment" className="text-xs m-0">
                        Comment
                    </label>
                    <input
                        type="text"
                        name="comment"
                        id="comment"
                        className="p-2 w-full border border-r-0 rounded-tl-md rounded-bl-md bg-white"
                    />
                </div>

                <button
                    type="submit"
                    className="p-2 bg-slate-300 border  rounded-tr-md rounded-br-md bg-white"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default InputComment
