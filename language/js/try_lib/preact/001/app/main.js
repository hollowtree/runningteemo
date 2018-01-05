import { h, render, Component } from 'preact'
import VirtualList from 'preact-virtual-list'
const DATA = [];
for (let x = 1000; x--;) DATA[x] = `Item #${x + 1}`;

class Demo extends Component {
    // rowHeight = 30;
    renderRow(row) {
        return <div class="row">{row}</div>;
    }

    render() {
        return (
            <VirtualList
                sync
                class="list"
                data={DATA}
                rowHeight={30}
                renderRow={this.renderRow}
            />
        );
    }
}

render(<Demo />, document.body);
