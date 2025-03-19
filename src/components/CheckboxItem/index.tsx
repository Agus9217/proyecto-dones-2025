import { Box, Button, Fieldset, Flex, Stack, Text } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { Data } from '@/types';
import { ValueChangeDetails } from '@zag-js/radio-group';
import { useEffect, useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

type AnswerEntry = {
  questionId: number;
  value: string;
};

export const CheckboxItem = ({ questions }: Data) => {
  const [titleIndex, setTitleIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>(
    {}
  );
  const [allAnswers, setAllAnswers] = useState<AnswerEntry[]>([]);

  const handleCheckedChange = (
    questionId: number,
    detail: ValueChangeDetails
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: detail.value,
    }));
  };

  const mensajes: Record<number, string> = {
    0: 'nada',
    1: 'muy poco',
    2: 'hasta cierto punto',
    3: 'mucho',
    4: 'muchísimo',
  };

  const title: string[] = [
    'Disfruto',
    'Me gustaría más que hasta ahora',
    'He tenido la experiencia',
    'La siguiente declaración me caracteriza',
    'Me resulta',
    'Estoy dispuesto a',
  ];

  const currentTitle = title[titleIndex];
  const filteredQuestions = questions?.filter((q) => q.title === currentTitle);

  const allAnswered = filteredQuestions?.every((question) =>
    question.items.every((item) => answers[+item.number] != null)
  );
  

  const nextTitle = () => {
    setTitleIndex((prev) => (prev + 1) % title.length);
  };

  const prevTitle = () => {
    setTitleIndex((prev) => (prev - 1 + title.length) % title.length);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [titleIndex]);

  useEffect(() => {
    const latestAnswers = Object.entries(answers).map(([questionId, value]) => ({
      questionId: Number(questionId),
      value,
    }));
    setAllAnswers(latestAnswers);
  }, [answers]);


  const allAnswerJson = JSON.stringify(allAnswers);

  console.log(allAnswerJson);

  return (
    <Fieldset.Root mt={'2rem'} bg={'#1f2937'} rounded={'xl'} p={8}>
      {filteredQuestions?.map((question) => (
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
                  onValueChange={(value) =>
                    handleCheckedChange(+item.number, value)
                  }
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
      <Flex justifyContent={'space-between'}>
        <Button
          colorPalette={'gray'}
          textAlign={'center'}
          disabled={titleIndex == 0 ? true : false}
          onClick={prevTitle}
          rounded={'full'}
          size={{ base: 'md', md: 'lg' }}
        >
          <IoIosArrowBack />
        </Button>
        <Button
          textAlign={'center'}
          colorPalette={'yellow'}
          onClick={nextTitle}
          rounded={'full'}
          disabled={!allAnswered}
          size={{ base: 'md', md: 'lg' }}
        >
          <IoIosArrowForward />
        </Button>
      </Flex>
    </Fieldset.Root>
  );
};
