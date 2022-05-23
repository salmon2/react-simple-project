import { useEffect, useCallback } from 'react';
import React from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));
  const onChangeFiled = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );

  //언마운트될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return <Editor onChangeFiled={onChangeFiled} title={title} body={body} />;
};

export default EditorContainer;
