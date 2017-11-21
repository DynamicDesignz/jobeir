// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import { Editor } from 'react-draft-wysiwyg';
import {
  EditorState,
  ContentState,
  Modifier,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import InputWrapper from '../components/InputWrapper';
import { wysiwig } from '../../themes/wysiwig-theme';

/**
 * <Wysiwyg />
 * Based on Draft JS, a third party react component pulled in to
 * be used to allow users to write a company description within
 * the job and company process.
 */
class WysiwygForm extends Component {
  state: {
    editorState: {},
    rawEditorState: string,
  };

  /**
   * Before anythign is handled we have to initiate the state with the desired
   * values. Here is where we set the initial values from the backend or simply
   * create the a blank form.
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    const { input, initialValue } = props;
    let editorState;

    // Checking if we have initial values passed in
    if (typeof initialValue === 'string') {
      /**
       * Converting the raw initial values that are in JSON format
       * into something that draft js can initialize the editor with
       */

      editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(props.initialValue)),
      );
    } else if (input.value.blocks) {
      editorState = EditorState.createWithContent(convertFromRaw(input.value));
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = { editorState, rawEditorState: '' };
  }

  onEditorStateChange = (editorState): void => {
    const { dispatch, meta } = this.props;
    const rawEditorState = JSON.stringify(
      convertToRaw(editorState.getCurrentContent()),
    );

    dispatch(change(meta.form, 'descriptionRaw', rawEditorState));
    this.setState({ editorState });
  };

  /**
   * Used to fake making the Editor seem bigger than it is because
   * the styling does not play very well with styled-components
   */
  handleClick = (): void => {
    this.Editor.focusEditor();
  };

  /**
   * Using handlePastedText as a way to strip all formatting from pasted in text
   */
  handlePastedText = text => {
    const { editorState } = this.state;
    const blockMap = ContentState.createFromText(text.trim()).blockMap;
    const newState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      blockMap,
    );
    this.onEditorStateChange(
      EditorState.push(editorState, newState, 'insert-fragment'),
    );
    return true;
  };

  render() {
    const { meta, input } = this.props;
    const { editorState, rawEditorState } = this.state;
    const showError: boolean = meta.touched && meta.error && meta.invalid;

    return (
      <InputWrapper {...this.props}>
        <EditorContainer
          data-val={rawEditorState}
          showError={showError}
          onClick={this.handleClick}
        >
          <Editor
            {...input}
            toolbar={wysiwig}
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            handlePastedText={this.handlePastedText}
            ref={editor => (this.Editor = editor)}
          />
        </EditorContainer>
      </InputWrapper>
    );
  }
}

export const Wysiwyg = connect()(WysiwygForm);

const EditorContainer = styled.div`
  border-radius: 3px;
  border: 1px solid #babbbb;
  padding: 20px;
  min-height: ${props => (props.minHeight ? props.minHeight : '300px')};
  max-height: 400px;
  overflow: scroll;
  margin: 0 auto 1rem;
  border-color: ${props => (props.showError ? '#f73c3c' : '')};

  .rdw-link-decorator-wrapper {
    a {
      color: ${props => props.theme.colors.purple};
      text-decoration-skip: ink;
    }
  }

  ${media.tablet`
    min-height: 200px;
    padding: 14px;
  `};

  .rdw-editor-wrapper {
    padding-top: 23px;

    ${media.tablet`
      padding-top: 26px;
    `};
  }

  .rdw-editor-toolbar {
    position: absolute;
    margin: -8px 0 0 -10px;
    top: 37px;
    width: 95%;
    background: #fff;
    padding: 9px 0;

    ${media.tablet`
      padding: 6px 0;
    `};

    ${media.phablet`
      top: 34px;
    `};
  }

  .rdw-editor-toolbar,
  .rdw-inline-wrapper,
  .rdw-list-wrapper {
    display: flex;
  }

  .rdw-block-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .rdw-dropdown-optionwrapper {
    position: absolute;
    list-style: none;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.22),
      0 8px 16px rgba(27, 39, 51, 0.14);

    .rdw-dropdownoption-default {
      padding: 5px 8px;
      border-bottom: 1px solid #f1f0f0;

      &:hover {
        background: #f9f9f9;
      }

      &:first-child {
        padding-top: 10px;
      }

      &:last-child {
        padding-bottom: 10px;
      }
    }
  }

  .rdw-option-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    margin: 0px 2px;
    cursor: pointer;
  }

  .rdw-option-active {
    background: ${props => props.theme.colors.pink};
    color: white;
    border-radius: 4px;
  }

  .DraftEditor-root {
    line-height: 1.5;
  }

  .rdw-editor-main {
    min-height: 210px;

    ${media.tablet`
      min-height: 110px;
    `};
  }

  .public-DraftStyleDefault-block {
    margin: 0.5em 0;

    ${media.tablet`
      margin: 4px 0;
    `};
  }

  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR {
    margin-left: 1.25em;
  }

  .rdw-link-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    position: relative;
  }
  .rdw-link-dropdown {
    width: 50px;
  }
  .rdw-link-dropdownOption {
    height: 40px;
    display: flex;
    justify-content: center;
  }
  .rdw-link-dropdownPlaceholder {
    margin-left: 8px;
  }
  .rdw-link-modal {
    position: absolute;
    top: 35px;
    left: 5px;
    display: flex;
    flex-direction: column;
    width: 235px;
    height: 205px;
    padding: 15px;
    z-index: 100;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.22),
      0 8px 16px rgba(27, 39, 51, 0.14);
  }
  .rdw-link-modal-label {
    font-size: 15px;
  }
  .rdw-link-modal-input {
    margin-top: 5px;
    border-radius: 3px;
    border: solid 1px #babbbb;
    height: 30px;
    margin-bottom: 15px;
    padding: 2px 5px;
  }
  .rdw-link-modal-input:focus {
    outline: none;
  }
  .rdw-link-modal-target-option {
    margin-bottom: 10px;
    display: none;
  }
  .rdw-link-modal-target-option > span {
    margin-left: 5px;
  }

  .rdw-link-modal-buttonsection {
    margin-top: 5px;
  }
  .rdw-link-modal-btn {
    margin-right: 2%;
    width: 49%;
    height: 32px;
    border: 1px solid #f1f1f1;
    border-radius: 2px;
    cursor: pointer;
    background: white;
    text-transform: capitalize;

    &:first-child {
      background: ${props => props.theme.colors.purple};
      color: #fff;
      border: 1px solid ${props => props.theme.colors.purple};
    }

    &:last-child {
      margin-right: 0;
    }
  }
  .rdw-link-modal-btn:hover {
    box-shadow: 1px 1px 0px #bfbdbd;
  }

  .rdw-link-modal-btn:active {
    box-shadow: 1px 1px 0px #bfbdbd inset;
  }
  .rdw-link-modal-btn:focus {
    outline: none !important;
  }
  .rdw-link-modal-btn:disabled {
    background: #ece9e9;
    border: 1px solid #ece9e9;
  }
  .rdw-link-dropdownoption {
    height: 40px;
    display: flex;
    justify-content: center;
  }

  .rdw-emoji-wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 6px;
    position: relative;
  }
  .rdw-emoji-modal {
    overflow: auto;
    position: absolute;
    top: 35px;
    left: 5px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 235px;
    height: 180px;
    border: 1px solid #f1f1f1;
    padding: 15px;
    border-radius: 2px;
    z-index: 100;
    background: white;
    box-shadow: 3px 3px 5px #bfbdbd;
  }
  .rdw-emoji-icon {
    margin: 2.5px;
    height: 24px;
    width: 24px;
    cursor: pointer;
    font-size: 22px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
`;
