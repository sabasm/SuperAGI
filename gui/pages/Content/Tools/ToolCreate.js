import React, {useState, useEffect, useRef} from 'react';
import Image from "next/image";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Tool.module.css';
import styles1 from '../Agents/Agents.module.css'
import dynamic from 'next/dynamic';
const CodeMirror = dynamic(() => import('react-codemirror2').then((module) => module.Controlled), { ssr: false });
import 'codemirror/theme/material-darker.css';


export default function ToolCreate({tool,addNewTool}) {
  const goalsArray = [{ paramater: '', argument: '' }]; // Example initial goals with two values
  const [goals, setGoals] = useState(goalsArray);
  const [toolName, setToolName] = useState(tool.name);
  const [toolDescription, setToolDescription,] = useState(tool.description,);
  const [toolClass, setToolClass,] = useState('');
  const [code, setCode] = useState('');
  const argumentArray = ['Integer', 'String', 'Float']
  const [argument, setArguments] = useState('Integer');
  const modelRef = useRef(null);
  const [modelDropdown, setModelDropdown] = useState(false);
  if (typeof window !== 'undefined') {
    import('codemirror/lib/codemirror.css');
    import('codemirror/theme/material.css');
    import('codemirror/mode/python/python');
  }
  const handleNameChange = (event) => {
    setToolName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setToolDescription(event.target.value);
  };
  const handleClassChange = (event) => {
    setToolClass(event.target.value);
  };
  const handleGoalValue1Change = (index, event) => {
    const newGoals = [...goals];
    newGoals[index].paramater = event.target.value;
    setGoals(newGoals);
  };

  const handleGoalValue2Change = (index, event) => {
    const newGoals = [...goals];
    newGoals[index].argument = event.target.value;
    setGoals(newGoals);
  };
  const handleRemoveGoal = (index) => {
    const newGoals = [...goals];
    newGoals.splice(index, 1);
    setGoals(newGoals);
  };

  const handleAddGoal = () => {
    const newGoal = { value1: '', value2: '' }; // Add a new goal with two empty values
    const newGoals = [...goals, newGoal];
    setGoals(newGoals);
  };

  const handleModelSelect = (index) => {
    setArguments(argumentArray[index]);
    setModelDropdown(false);
  };

  const handleToolCreate = (index) => {
    toast.dark('Tool created successfully', {autoClose: 1800});
  };


  return (<>
    <div>
      <div className="row" style={{padding: '10px'}}>
        <div className="col-12">
          <div>
            <div className={styles1.page_title} style={{marginTop:'10px'}}>Create new tool</div>
          </div>
          <div style={{marginTop:'10px'}}>
            <div>
              <label className={styles1.form_label}>Name</label>
              <input className="input_medium" type="text" value={toolName} onChange={handleNameChange} />
            </div>
            <div style={{marginTop: '15px'}}>
              <label className={styles1.form_label}>Description</label>
              <textarea className="textarea_medium" rows={3} value={toolDescription} onChange={handleDescriptionChange} />
            </div>
            <div style={{marginTop:'10px'}}>
              <label className={styles1.form_label}>Class Name</label>
              <input className="input_medium" type="text" value={toolClass} onChange={handleClassChange} />
            </div>
            <div style={{marginTop: '15px'}}>
              <label className={styles1.form_label}>Input values</label>
              {goals.map((goal, index) => (<div key={index} style={{marginBottom:'10px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{flex:'1'}}>
                  <input className="input_medium" placeholder="Enter parameter" style={{width:'49%',float:'left'}} type="text" value={goal.paramater} onChange={(event) => handleGoalValue1Change(index, event)} />
                  <div className="dropdown_container_search" style={{marginLeft:'4%'}}>
                    <div className="custom_select_container" onClick={() => setModelDropdown(!modelDropdown)} style={{alignItems:'normal'}}>
                      {argument}<Image width={20} height={21} src={!modelDropdown ? '/images/dropdown_down.png' : '/images/dropdown_up.png'} alt="expand-icon"/>
                    </div>
                    <transition name="fade-scale">
                      {modelDropdown && <div className="custom_select_options" ref={modelRef} style={{width:'100%'}}>
                        {argumentArray.map((argument, index) => (<div key={index} className="custom_select_option" onClick={() => handleModelSelect(index)} style={{padding:'12px 14px',maxWidth:'100%'}}>
                          {argument}
                        </div>))}
                      </div>}
                    </transition>
                  </div>
                  {/*<select className="input_medium" style={{ width: '49%', float: 'right' }} value={goal.argument} onChange={(event) => handleGoalValue2Change(index, event)}>*/}
                  {/*  {argumentArray.map((argument, argumentIndex) => (*/}
                  {/*      <option key={argumentIndex} value={argument}>*/}
                  {/*        {argument}*/}
                  {/*      </option>*/}
                  {/*  ))}*/}
                  {/*</select>*/}
                </div>
                <div>
                  <button className={styles1.agent_button} style={{marginLeft:'4px',padding:'5px'}} onClick={handleRemoveGoal} >
                    <Image width={20} height={21} src="/images/close_light.png" alt="close-icon"/>
                  </button>
                </div>
              </div>))}
              <button className={styles1.agent_button} onClick={handleAddGoal}>
                Add
              </button>
            </div>
            <div style={{marginTop:'10px'}}>
              <div className={styles.code_head}> &nbsp;&nbsp;Python 3 </div>
              <CodeMirror
                  value={code}
                  options={{
                    mode: 'python',
                    theme: 'material-darker',
                    lineNumbers: true,
                    placeholder: 'Enter your script here'
                  }}
                  onBeforeChange={(editor, data, value) => {
                    setCode(value);
                  }}
                  onChange={(editor, data, value) => { setCode(value)}}
              />
            </div>
          </div>
          <div className={styles.button_class}>
            <button className={styles1.agent_button} >Cancel</button>
            <button className={styles1.agent_button} onClick={handleToolCreate}>Add</button>

          </div>
    </div>
      </div>
    </div>
    <ToastContainer/>
  </>)
}