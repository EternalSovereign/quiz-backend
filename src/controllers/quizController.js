"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuiz = exports.updateQuiz = exports.getQuizById = exports.getQuizzes = exports.createQuiz = void 0;
const quiz_1 = __importDefault(require("../models/quiz"));
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const teacher_id = req.session.userId;
    console.log(teacher_id);
    try {
        const newQuiz = yield quiz_1.default.create({ title, description, teacher_id });
        res.status(201).json(newQuiz);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating quiz" });
    }
});
exports.createQuiz = createQuiz;
const getQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield quiz_1.default.findAll({
            where: { teacher_id: req.session.userId },
        });
        res.status(200).json(quizzes);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving quizzes" });
    }
});
exports.getQuizzes = getQuizzes;
const getQuizById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const quiz = yield quiz_1.default.findByPk(id);
        if (quiz) {
            res.status(200).json(quiz);
        }
        else {
            res.status(404).json({ message: "Quiz not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving quiz" });
    }
});
exports.getQuizById = getQuizById;
const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const quiz = yield quiz_1.default.findByPk(id);
        if (quiz) {
            quiz.title = title;
            quiz.description = description;
            yield quiz.save();
            res.status(200).json(quiz);
        }
        else {
            res.status(404).json({ message: "Quiz not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating quiz" });
    }
});
exports.updateQuiz = updateQuiz;
const deleteQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const quiz = yield quiz_1.default.findByPk(id);
        if (quiz) {
            yield quiz.destroy();
            res.status(200).json({ message: "Quiz deleted" });
        }
        else {
            res.status(404).json({ message: "Quiz not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting quiz" });
    }
});
exports.deleteQuiz = deleteQuiz;
