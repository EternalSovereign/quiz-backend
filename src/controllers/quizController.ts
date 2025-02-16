import { Request, Response } from "express";
import Quiz from "../models/quiz";

export const createQuiz = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const teacher_id = req.session.userId;
    console.log(teacher_id);

    try {
        const newQuiz = await Quiz.create({ title, description, teacher_id });
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(500).json({ message: "Error creating quiz" });
    }
};

export const getQuizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await Quiz.findAll({
            where: { teacher_id: req.session.userId },
        });
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving quizzes" });
    }
};

export const getQuizById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const quiz = await Quiz.findByPk(id);
        if (quiz) {
            res.status(200).json(quiz);
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving quiz" });
    }
};

export const updateQuiz = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const quiz = await Quiz.findByPk(id);
        if (quiz) {
            quiz.title = title;
            quiz.description = description;
            await quiz.save();
            res.status(200).json(quiz);
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating quiz" });
    }
};

export const deleteQuiz = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const quiz = await Quiz.findByPk(id);
        if (quiz) {
            await quiz.destroy();
            res.status(200).json({ message: "Quiz deleted" });
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting quiz" });
    }
};
