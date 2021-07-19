import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation CreateTodoMutation(
    $taskTitle: String!
    $createdBy: String!
    $assignedTo: String!
    $status: String!
  ) {
    createTodo(
      taskTitle: $taskTitle
      createdBy: $createdBy
      assignedTo: $assignedTo
      status: $status
    ) {
      taskTitle
      createdBy
      assignedTo
      status
      createdAt
      updatedAt
    }
  }
`;

export const LOGIN_USER = gql`
  query Query($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      name
      email
    }
  }
`;

export const GET_TODOS = gql`
  query Query {
    getTodo {
      id
      taskTitle
      createdBy
      status
      assignedTo
      createdAt
      updatedAt
    }
  }
`;
