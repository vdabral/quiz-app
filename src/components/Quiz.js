import React, {useState, useEffect} from "react";
import axios from "axios";
import { Box, Button, Text, RadioCard, RadioGroup , Stack} from "@chakra-ui/react";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setcurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");

    useEffect(() => {
        axios
        .get("https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple")
        .then((response) => {
            setQuestions(response.data.results);
        })
        .catch((error) => console.error("Error fetching questions:",error)); 
    },[]);
    const handleNext = () => {
        if(questions[currentQuestion].correct_answer === selectedAnswer){
            setScore(score + 1);
        }
        selectedAnswer("");
        setcurrentQuestion(currentQuestion + 1);
    };
    if(!questions.length){
        return <Text>Loading questions...</Text>;
    }

    const current = questions[currentQuestion];
    const options = [...current.incorrect_answers, current.correct_answer].sort();

    return (
        <Box p={4} maxW="600px" mx= "auto">
            <Text fontSize="xl" mb={4}>
                Question {currentQuestion +1}/{questions.length}
            </Text>
            <Text mb={4}>{current.questions}</Text>
            <RadioGroup onChange={(value) => setSelectedAnswer(value)} value={selectedAnswer}>
                <Stack direction="column">
                    {options.map((option, index) => (
                        <RadioCard key={index} value={option}>{option}</RadioCard>
                    ))}
                </Stack>
            </RadioGroup>
            <Button mt={4} onClick={handleNext} isDisabled={!selectedAnswer} colorScheme="blue">Next</Button>
            {currentQuestion === questions.length-1 && (
                <Text mt={4}>Your score: {score}/{questions.length}</Text>
            )}
        </Box>
    );
};
export default Quiz