import React from "react";

const WarningData = ({ warning }) => [
    <td key='severity'>{warning.severity}</td>,
    <td key='from'>{warning.prediction.from}</td>,
    <td key='to'>{warning.prediction.to}</td>,
    <td key='type'>{warning.prediction.type}</td>,
    <td key='unit'>{warning.prediction.unit}</td>,
    <td key='time'>{warning.prediction.time}</td>,
    <td key='place'>{warning.prediction.place}</td>
]

const WarningRow = (props) => (
    <tr>
        <WarningData {...props} />
    </tr>
)

const WarningDataBody = ({ model }) => (
    <tbody>
        {

            model.Warning().map(warning => <WarningRow key={warning.id.toString()} {...{ warning }} />)
        }

    </tbody>
)

const game_view = dispatch => ({ warnings, newModel }) =>
    <div id='base'>
        <div>
            <h1>Warnings</h1>
            <table id='weather'>
                <thead>
                    <tr>
                        <td>severity</td>
                        <td>from</td>
                        <td>to</td>
                        <td>type</td>
                        <td>Unit</td>
                        <td>Time</td>
                        <td>Place</td>
                    </tr>
                </thead>
                <WarningDataBody model={newModel} />
            </table>
        </div>
    </div>


const game_list_view = dispatch => () =>
    <div>
        <button id='polling'
            onClick={() => dispatch({ type: "polling" })}>
            se data
        </button>
    </div>

const View = ({ model, dispatch }) => model.accept({
    start_screen: game_list_view(dispatch),
    visit_pre_game: game_list_view(dispatch),
    warning_list: game_view(dispatch),
    visit_game: game_view(dispatch)
})



export const create_view = dispatch => model => <View model={model} dispatch={dispatch} />