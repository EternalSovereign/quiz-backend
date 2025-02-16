import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Quiz extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public teacher_id!: number;
}

Quiz.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Quiz",
    }
);

export default Quiz;
