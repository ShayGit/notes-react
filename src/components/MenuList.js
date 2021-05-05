import { FixedSizeList as List } from "react-window";

const MenuList=({ options, children, maxHeight, getValue })=> {
    const height = 35;

      const [value] = getValue();
      const initialOffset = options.indexOf(value) * height;
  
      return (
        <List
          height={maxHeight}
          itemCount={children.length}
          itemSize={height}
          initialScrollOffset={initialOffset}
        >
          {({ index, style }) => <div style={style}>{children[index]}</div>}
        </List>
      );
    }

    export default MenuList;