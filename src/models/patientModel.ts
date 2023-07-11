import { Schema, model, Model, connection } from 'mongoose';
import { mongoConnect } from '../database/mongo';
mongoConnect();

type PatientType = {
	infos: {
		name: string;
		email: string;
		password: string;
		dateBirth: string;
		numSus: string;
		entry: Date;
	};
	symptoms: {
		diabetes: boolean;
		pressure: {
			type: string;
			enum: ["alta", "baixa", "normal"];
		};
		allergies: [string];
	};
	diagnosis: {
		dengue: boolean;
		covid: boolean;
		lombriga: boolean;
	};
	uti: boolean;
};

const schema = new Schema<PatientType>(
	{
		infos: {
			name: { type: String, required: true },
			email: { type: String, required: true },
			password: { type: String, required: true },
			dateBirth: { type: String, required: true },
			numSus: { type: String, required: true, unique: true },
			entry: { type: Date },
		},
		symptoms: {
			diabetes: { type: Boolean },
			pressure: {
				type: String,
				enum: ["alta", "baixa", "normal"],
			},
			allergies: [{ type: String }],
		},
		diagnosis: {
			dengue: { type: Boolean },
			COVID: { type: Boolean },
			lombriga: { type: Boolean },
		},
		uti: { type: Boolean },
	},
	{ collection: "patient" }
);


const modelName: string = 'Patient';
export default connection && connection.models[modelName]
	? (connection.models[modelName] as Model<PatientType>)
	: model<PatientType>(modelName, schema);
