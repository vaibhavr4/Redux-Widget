import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/index"
import * as actions from '../actions'

///////////////////////////////////////// Heading //////////////////////////////////////////////////////////////////////
const Heading = ({widget, preview, headingTextChanged, headingSizeChanged}) => {
  let selectElem
  let inputElem
  return(
    <div>
      <div hidden={preview}>
        <h2> Heading {widget.size}</h2>
          <input onChange={() => headingTextChanged(widget.id, inputElem.value)}
                 value={widget.text}
                 ref={node => inputElem = node}/>
          <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                  value={widget.size}
                  ref={node => selectElem = node}>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>
          <h3>Preview</h3>
      </div>
      {widget.size == 1 && <h1>{widget.text}</h1>}
      {widget.size == 2 && <h2>{widget.text}</h2>}
      {widget.size == 3 && <h3>{widget.text}</h3>}
    </div>
  )
}
const dispathToPropsMapper = dispatch => ({
  headingTextChanged: (widgetId, newText) =>
    actions.headingTextChanged(dispatch, widgetId, newText),
  headingSizeChanged: (widgetId, newSize) =>
    actions.headingSizeChanged(dispatch, widgetId, newSize)
})
const stateToPropsMapper = state => ({
  preview: state.preview
})
const HeadingContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Heading)

///////////////////////////////////////// Heading End //////////////////////////////////////////////////////////////////

//////////////////////////////////////// Paragraph /////////////////////////////////////////////////////////////////////
const Paragraph = ({widget, preview, paraTextChanged}) => {
    let inputElem
    return(
        <div>
    <div hidden={preview}>
        <textarea onChange={() => paraTextChanged(widget.id, inputElem.value)}
                  ref={node => inputElem= node}
                  value={widget.text}>
    </textarea>
        <h3>Paragraph Preview</h3>
    </div>
            <p> {widget.text} </p>

        </div>
    )
}

const dispatchToPropsMapperPara = dispatch =>
    ({
        paraTextChanged: (widgetId, newText) =>
            actions.paraTextChanged(dispatch,widgetId, newText)
    })

const stateToPropsMapperPara = state => ({
    preview: state.preview
})

const ParaContainer = connect(stateToPropsMapperPara,dispatchToPropsMapperPara)(Paragraph)

///////////////////////////////////////// Paragraph End ////////////////////////////////////////////////////////////////

//////////////////////////////////////// Image /////////////////////////////////////////////////////////////////////////
const Image = ({widget, preview, imageTextChanged}) => {
    let inputElem3
    return(
        <div>
        <div hidden={preview}>
            <input onChange={() => imageTextChanged(widget.id, inputElem3.value)}
                   ref={node3 => inputElem3= node3}
                   value={widget.text}
                   />
    <h3 style={Header}>Image Preview</h3>
        </div>
            <img src={widget.text} alt={widget.text} height="42" width="42"/>
        </div>

    )
}

const stateToPropsMapperImage = state => ({
    preview: state.preview
})

const dispatchToPropsMapperImage = dispatch =>
    ({
        imageTextChanged: (widgetId, imageText) =>
            actions.imageTextChanged(dispatch,widgetId, imageText)
    })

const ImageContainer = connect(stateToPropsMapperImage,dispatchToPropsMapperImage)(Image)

//////////////////////////////////////// Image End /////////////////////////////////////////////////////////////////////

///////////////////////////////////////// List /////////////////////////////////////////////////////////////////////////
const List = ({widget, preview, listTextChanged, listTypeChanged}) =>{
    let selectElem2
    let inputElem2
   return(
       <div>
    <div hidden={preview}>
    <h2>List {widget.listType}</h2>
    <textarea onChange={() => listTextChanged(widget.id, inputElem2.value)}
           ref={node2 => inputElem2= node2}
           value={widget.text}  />

        <select onChange={() => listTypeChanged(widget.id, selectElem2.value)}
            ref={node2 => selectElem2=node2}
                value={widget.listType}>
            <option value="1">Ordered List</option>
        <option value="2">Unordered List</option>
        </select>


    <h3> Preview</h3>
</div>
    {widget.listType== 1 && <ol><li> {widget.text}</li></ol>}
    {widget.listType== 2 && <ul><li> {widget.text}</li> </ul>}
    </div>
   )
}

const stateToPropsMapperList = state => ({
    preview: state.preview
})

const dispatchToPropsMapperList = dispatch =>
    ({
        listTextChanged: (widgetId, newListText) =>
            actions.listTextChanged(dispatch,widgetId,newListText),
        listTypeChanged: (widgetId,listType) =>
            actions.listTypeChanged(dispatch,widgetId,listType)
    })


const ListContainer = connect(stateToPropsMapperList,dispatchToPropsMapperList)(List)

///////////////////////////////////////// List End /////////////////////////////////////////////////////////////////////

const Widget = ({widget, preview, dispatch}) => {
  let selectElement
  return(
    <li>
      <div hidden={preview}>
      {widget.id} {widget.widgetType}

      <select value={widget.widgetType}
              onChange={e =>
          dispatch({
            type: 'SELECT_WIDGET_TYPE',
            id: widget.id,
            widgetType: selectElement.value
          })} ref={node => selectElement = node}>
        <option>Heading</option>
        <option>Paragraph</option>
        <option>List</option>
        <option>Image</option>
      </select>

      <button onClick={e => (
        dispatch({type: DELETE_WIDGET, id: widget.id})
      )}>Delete<i className="fa fa-remove"></i></button>
      </div>
      <div>
        {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
        {widget.widgetType==='Paragraph' && <ParaContainer widget={widget}/>}
        {widget.widgetType==='List' && <ListContainer widget={widget}/>}
        {widget.widgetType==='Image' && <ImageContainer widget={widget}/>}
      </div>
    </li>
  )
}
const WidgetContainer = connect(state => ({
  preview: state.preview
}))(Widget)
export default WidgetContainer



///////////////////////////////////style/////////////////////////////////////////////////////////////

const Header =
{
    padding: "10px 20px", textAlign: "center", color: "red"
}