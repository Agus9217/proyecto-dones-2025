import { Box, Button, Fieldset, Flex, Stack, Text } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { LeaderData } from "@/types";
import { ValueChangeDetails } from "@zag-js/radio-group";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

export const LeaderCheckboxItem = ({ questions }: LeaderData) => {
  const { user } = useUser();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  console.log(answers)

  const mensajes: Record<number, string> = {
    0: "En ningún caso",
    1: "Apenas",
    2: "En algún caso",
    3: "Bien",
    4: "Muy bien",
  };

  const handleCheckedChange = (
    questionId: string,
    datails: ValueChangeDetails
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: datails.value,
    }));
  };

  // const allAnswered = leaderQuestions?.every((leaderQuestion) =>
  //   leaderQuestion.items.every((item) => answers[+item.number] != null)
  // );

  const saveChecklist = async () => {
    const checklistData = {
      questions: questions?.map((q) => ({
        clerkId: user?.id,
        title: q.title,
        items: q.items?.map((item) => ({
          letter: item.letter,
          text: item.text,
          score: answers[item.letter] ? [answers[item.letter]] : [], // Aquí se guardan los scores seleccionados
        })),
      })),
    };
    try {
      await axios.post("http://localhost:4000/leaderchecklist", checklistData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fieldset.Root mt={"2rem"} bg={"#1f2937"} rounded={"xl"} p={8}>
      {questions?.map((question) => (
        <Box key={question._id} mb={4}>
          <Fieldset.Legend fontSize={{ base: "xl", md: "2xl" }} py="1rem">
            {question.title}
          </Fieldset.Legend>
          <Fieldset.HelperText>
            * Obligatorio contestar todas las preguntas
          </Fieldset.HelperText>
          <Fieldset.Content>
            {question.items?.map((item) => (
              <Box key={item.letter} mb={2}>
                <Flex py={"1rem"} alignItems={"center"} gap={"10px"}>
                  <Flex justifyContent={"center"} alignItems={"center"}>
                    <Text
                      color={"#FFD700"}
                      fontWeight={"bold"}
                      textAlign={"center"}
                      fontSize="md"
                    >
                      {item.letter}
                    </Text>
                  </Flex>
                  <Text> - </Text>
                  <Text fontSize={{ base: "sm", lg: "lg", md: "md" }}>
                    {item.text}
                  </Text>
                </Flex>
                <RadioGroup
                  bg={"#374151"}
                  defaultValue={"4"}
                  size={{ base: "sm", md: "md", lg: "lg" }}
                  variant={"outline"}
                  gap={"10px"}
                  alignItems={"center"}
                  rounded={"xl"}
                  colorPalette={"yellow"}
                  p={6}
                  onValueChange={(value) => {
                    handleCheckedChange(item.letter, value);
                  }}
                >
                  <Stack
                    border={"none"}
                    direction={{ base: "column", lg: "row" }}
                  >
                    {item.score?.map((score) => (
                      <Radio
                        key={score}
                        value={score.toString()}
                        mr={2}
                        style={{
                          borderColor: "white",
                        }}
                      >
                        {mensajes[score]}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>
            ))}
          </Fieldset.Content>
        </Box>
      ))}
      <Button onClick={saveChecklist}>Enviar Prueba</Button>
    </Fieldset.Root>
  );
};
