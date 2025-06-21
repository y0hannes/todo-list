const UndoRedoControls = ({ onUndo, onRedo, canUndo, canRedo }) => (
  <div>
    <button onClick={onUndo} disabled={!canUndo}>Undo</button>
    <button onClick={onRedo} disabled={!canRedo}>Redo</button>
  </div>
);

export default UndoRedoControls;
