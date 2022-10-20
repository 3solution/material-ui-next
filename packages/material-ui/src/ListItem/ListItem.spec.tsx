import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';

// button: boolean
function BooleanButtonTest() {
  // https://github.com/mui-org/material-ui/issues/14971

  function EditableItemFail(props: { editable: boolean }) {
    const { editable } = props;
    // @ts-expect-error 'boolean' is not assignable to type 'true'
    return <ListItem button={editable}>Editable? {editable}</ListItem>;
  }

  function EditableItemValid(props: { editable: boolean }) {
    const { editable } = props;
    if (editable) {
      <ListItem button>Editable? Yes</ListItem>;
    }
    return <ListItem>Editable? No</ListItem>;
  }
}

// verify that https://github.com/mui-org/material-ui/issues/19756 already worked.
function MouseEnterTest() {
  function handleMouseEnter(event: React.MouseEvent<HTMLLIElement>) {}
  <ListItem onMouseEnter={handleMouseEnter} />;

  function handleMouseEnterButton(event: React.MouseEvent<HTMLDivElement>) {}
  // @ts-expect-error
  <ListItem onMouseEnter={handleMouseEnterButton} />; // desired: missing property button
  <ListItem button onMouseEnter={handleMouseEnterButton} />;
}
