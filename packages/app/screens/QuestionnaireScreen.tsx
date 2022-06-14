import React, { useRef } from 'react';
import { Container, QuestionnaireContainer } from '../components/Container';
import { RootStackScreenProps } from '../types';
import ReactNativeForm, { defaultProps, FormContext } from 'rjsf-native';
import { Alert, Button } from 'react-native';

export default function QuestionnaireScreen({
  route,
}: RootStackScreenProps<'Questionnaire'>) {
  const { questionnaire } = route.params;
  const form = useRef<any>(null);
  return (
    <Container>
      <QuestionnaireContainer>
        <ReactNativeForm
          // @ts-ignore
          ref={form}
          onError={(e) => {
            Alert.alert('Error', 'Please fill in all the fields');
          }}
          schema={questionnaire.schema}
          uiSchema={questionnaire.uischema}
          onSubmit={(form) => {
            const { formData } = form;
            console.log(formData);
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
    </Container>
  );
}
