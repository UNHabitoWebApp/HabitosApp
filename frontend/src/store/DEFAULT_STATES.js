export const DEFAULT_STATE = {
	"2025": {         
	  	"02": {
			"24": {       
				"habits": [ 
					{ name: "Pierna", description: "Rutina de ejercicios", start: "9:00", end: "11:30" },
				]
		  	},      
			"25": {       
				"habits": [ 
					{ name: "Journaling", description: "Escribir reflexiones", start: "13:00", end: "14:00" },
				]
		  	}, 
			"26": {       
				"habits": [ 
					{ name: "Lectura", description: "Leer un libro", start: "1:00", end: "6:30" },
				]
		  	},   
			"27": {       
		  		"habits": [ 
					{ name: "Cocinar", description: "Preparar la cena", start: "19:00", end: "20:00" },
		  		]
			},
			"28": {       
				"habits": [ 
					{ name: "Meditar", description: "Práctica de mindfulness", start: "21:00", end: "21:30" },
				]
			},

	},
	"03":{
		"01": {       
			"habits": [ 
				{ name: "Dormir", description: "Descansar", start: "22:00", end: "23:00" },
			]
		},
		"02": {       
			"habits": [ 
				{ name: "Dormir", description: "Descansar", start: "23:00", end: "23:59" },
			]
		  }
	}
	}
} 

// thunks/habitThunks.js
import { fetchHabitsRange } from '../service/fetchHabitsRange';
import { addFetchedHabits } from './slices/habitSlices';

export const loadInitialHabits = () => async (dispatch, getState) => {
    const { startDate, endDate } = getState().date; // Obtener fechas del estado de Redux

    try {
        const events = await fetchHabitsRange(startDate, endDate); // Llamar a la API
        if (events) {
            dispatch(addFetchedHabits({ events })); // Despachar acción para guardar los datos
        }
    } catch (error) {
        console.error("Error al cargar los hábitos iniciales:", error);
    }
};