let root = [null];

function Selection(groups, parents) {
    this._groups = groups
    this._parents = parents
}

Selection.prototype = {
    constructor: Selection,
    select: selection_select
}

function selection_select(select) {
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
            if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
                if ("__data__" in node) subnode.__data__ = node.__data__;
                subgroup[i] = subnode;
            }
        }
    }

    return new Selection(subgroups, this._parents);
}

function selector(selector) {
    return selector == null ? none : function () {
        return this.querySelector(selector);
    };
}

function select(selector) {
    return typeof selector === 'string'
        ? new Selection([[document.querySelector(selector)]], [document.documentElement])
        : new Selection([[selector]], root)
}

console.log(select('body'))
