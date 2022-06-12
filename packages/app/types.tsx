/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { JSONSchema7 } from 'json-schema';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

interface QuestionnaireScreenParams {
  questionnaire: Questionnaire;
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Questionnaire: QuestionnaireScreenParams;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Questionnaires: undefined;
  Settings: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface Questionnaire {
  _id: string;
  schema: JSONSchema7;
  uischema: UiSchema;
  title: string;
  language: string;
}

export type UiSchema = {
  'ui:field'?: string;
  'ui:widget'?: string;
  'ui:options'?: {
    [key: string]: boolean | number | string | object | any[] | null;
  };
  'ui:order'?: string[];
  [name: string]: any;
  'ui:submitButtonOptions'?: UISchemaSubmitButtonOptions;
};

export type UISchemaSubmitButtonOptions = {
  submitText: string;
  norender: boolean;
  props: {
    disabled?: boolean;
    className?: string;
    [name: string]: any;
  };
};
