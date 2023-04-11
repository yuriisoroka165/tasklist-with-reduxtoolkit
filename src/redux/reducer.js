import { combineReducers } from "redux";

import { statusFilters } from "./constants";

const tasksInitialState = [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
];

const taskReducer = (state = tasksInitialState, action) => {
    switch (action.type) {
        case "tasks/addTask":
            return [...state, action.payload];
        case "tasks/deleteTask":
            return state.filter(task => task.id !== action.payload);
        case "tasks/toggleCompleted":
            return state.map(task => {
                if (task.id !== action.payload) {
                    return task;
                }
                return { ...task, completed: !task.completed };
            });
        default:
            return state;
    }
};

const filtersInitialState = {
    status: statusFilters.all,
};

const filtersReducer = (state = filtersInitialState, action) => {
    switch (action.type) {
        case "filters/setStatusFilter":
            return {
                ...state,
                status: action.payload,
            };

        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    tasks: taskReducer,
    filters: filtersReducer,
});

// Це працює але можна зробити комбайн редюсерів вище
// export const rootReducer = (state = {}, action) => {
//     return {
//         tasks: taskReducer(state.tasks, action),
//         filters: filtersReducer(state.filters, action),
//     };
// };

// Це прцює але вище йде композиція тобто розділення на незалежні редюсери
// import { statusFilters } from "./constants";

// const initialState = {
//     tasks: [
//         { id: 0, text: "Learn HTML and CSS", completed: true },
//         { id: 1, text: "Get good at JavaScript", completed: true },
//         { id: 2, text: "Master React", completed: false },
//         { id: 3, text: "Discover Redux", completed: false },
//         { id: 4, text: "Build amazing apps", completed: false },
//     ],
//     filters: {
//         status: statusFilters.all,
//     },
// };

// // initialState використовується як значення стану за замовчуванням
// export const rootReducer = (state = initialState, action) => {
//     // редюсер розрізняє екшени за значенням властивості type
//     switch (action.type) {
//         // залежно від типу екшену виконуватиметься різна логіка
//         case "tasks/addTask": {
//             // повертає новий обєкт стану де розпилюється старий стан і
//             // новий масив задач де є старі задачі і обєкт нової задаячі
//             return {
//                 ...state,
//                 tasks: [...state.tasks, action.payload],
//             };
//         }

//         case "tasks/deleteTask":
//             return {
//                 ...state,
//                 tasks: state.tasks.filter(task => task.id !== action.payload),
//             };

//         case "tasks/toggleCompleted":
//             return {
//                 ...state,
//                 tasks: state.tasks.map(task => {
//                     if (task.id !== action.payload) {
//                         return task;
//                     }
//                     return { ...task, completed: !task.completed };
//                 }),
//             };

//         case "filters/setStatusFilter":
//             return {
//                 ...state,
//                 filters: {
//                     ...state.filters,
//                     status: action.payload,
//                 },
//             };

//         default:
//             // кожен редюсер отримує всі екшени, відправлені у стор
//             // якщо редюсер не повинен обробляти якийсь тип екшену
//             // то необхідно повернути наявний стан без змін
//             return state;
//     }
// };
