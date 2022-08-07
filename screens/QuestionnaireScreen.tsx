import React, { useRef } from 'react';
import { Container, QuestionnaireContainer } from '../components/Container';
import { FilledQuestionnaire, RootStackScreenProps } from '../types';
import ReactNativeForm, { defaultProps, FormContext } from 'rjsf-native';
import { Alert, Button, ScrollView } from 'react-native';
import { pushQuestionnaire } from '../utils/questionnaireUploader';
import { useNavigation } from '@react-navigation/native';

export default function QuestionnaireScreen({
  route,
}: RootStackScreenProps<'Questionnaire'>) {
  const { questionnaire } = route.params;
  const navigation = useNavigation();
  const form = useRef<any>(null);
  return (
    <Container>
      <ScrollView
        style={{
          width: '100%',
        }}
      >
        <QuestionnaireContainer>
          <ReactNativeForm
            // @ts-ignore
            ref={form}
            onError={(e) => {
              Alert.alert('Error', 'Please fill in all the fields');
            }}
            schema={questionnaire.schema}
            uiSchema={questionnaire.uischema}
            onSubmit={async (form) => {
              const { formData } = form;
              const filledQuestionnaire: FilledQuestionnaire = {
                questionnaire: questionnaire._id,
                formData,
                time: new Date(),
              };

              await pushQuestionnaire(filledQuestionnaire);
              navigation.navigate('Root');
            }}
            {...defaultProps}
          >
            <Button
              title="Submit"
              onPress={() => {
                form.current?.submit();
              }}
            />
          </ReactNativeForm>
        </QuestionnaireContainer>
      </ScrollView>
    </Container>
  );
}
