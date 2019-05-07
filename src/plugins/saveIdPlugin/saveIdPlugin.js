const _ = require("lodash");

// https://github.com/benjamine/jsondiffpatch/issues/190

function diffPluginSaveId(context) {
    // I want to add __id and __model

    if (
        context.leftType === "object" &&
        typeof context.left["EAN"] !== "undefined"
    ) {
        const changed = !!_.find(
            context.children,
            childContext => childContext.result
        );

        if (changed) {
            context.setResult({
                __id: context.right.EAN,
                __model: context.left.Referencia
            });
        }
    }
}

diffPluginSaveId.filterName = "saveId";

module.exports = diffPluginSaveId;
