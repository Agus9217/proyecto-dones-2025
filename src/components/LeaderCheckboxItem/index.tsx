import { Box, Button, Fieldset, Flex, Stack, Text } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { Data } from '@/types';
import { ValueChangeDetails } from '@zag-js/radio-group';
import { useState } from 'react';

export const LeaderCheckboxItem = ({ leaderQuestions }: Data) => {
  const [answers, setAnswers] = useState<Record<string, ValueChangeDetails>>(
    {}
  );

  const mensajes: Record<number, string> = {
    0: 'En ningún caso',
    1: 'Apenas',
    2: 'En algún caso',
    3: 'Bien',
    4: 'Muy bien',
  };

  const handleCheckedChange = (
    questionId: string,
    value: ValueChangeDetails
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };


  // const allAnswered = leaderQuestions?.every((leaderQuestion) =>
  //   leaderQuestion.items.every((item) => answers[+item.number] != null)
  // );

  return (
    <Fieldset.Root mt={'2rem'} bg={'#1f2937'} rounded={'xl'} p={8}>
      {leaderQuestions?.map((question) => (
        <Box key={question._id} mb={4}>
          <Fieldset.Legend fontSize={{ base: 'xl', md: '2xl' }} py="1rem">
            {question.title}
          </Fieldset.Legend>
          <Fieldset.HelperText>
            * Obligatorio contestar todas las preguntas
          </Fieldset.HelperText>
          <Fieldset.Content>
            {question.items.map((item) => (
              <Box key={item.number} mb={2}>
                <Flex py={'1rem'} alignItems={'center'} gap={'10px'}>
                  <Flex justifyContent={'center'} alignItems={'center'}>
                    <Text
                      color={'#FFD700'}
                      fontWeight={'bold'}
                      textAlign={'center'}
                      fontSize="md"
                    >
                      {item.number}
                    </Text>
                  </Flex>
                  <Text> - </Text>
                  <Text fontSize={{ base: 'sm', lg: 'lg', md: 'md' }}>
                    {item.text}
                  </Text>
                </Flex>
                <RadioGroup
                  bg={'#374151'}
                  defaultValue={null}
                  size={{ base: 'sm', md: 'md', lg: 'lg' }}
                  variant={'outline'}
                  gap={'10px'}
                  alignItems={'center'}
                  rounded={'xl'}
                  colorPalette={'yellow'}
                  p={6}
                  onValueChange={(value) => handleCheckedChange(item.number.toString(), value)}
                >
                  <Stack
                    border={'none'}
                    direction={{ base: 'column', lg: 'row' }}
                  >
                    {item.score.map((score) => (
                      <Radio
                        key={score}
                        value={score.toString()}
                        mr={2}
                        style={{
                          borderColor: 'white',
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
    </Fieldset.Root>
  );
};
