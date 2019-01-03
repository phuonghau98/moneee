import gql from 'graphql-tag'

export const MODIFY_ACCOUNTS = gql`
mutation modifyAccounts($userId: ID!, $isIncrease: Boolean!, $amount: Float!, $code: String!) {
  modifyAccounts(modifyPayload: {
    userId: $userId,
    isIncrease: $isIncrease,
    amount: $amount,
    code: $code
  }){
    bank
    cash
    cc
  }
}
`
export const CREATE_USER = gql`
  mutation createUser($name: String!, $usn: String!, $pwd: String!){
    createUser(createUserInfo: { name: $name, usn: $usn, pwd: $pwd }){
      id
    }
  }
`
export const ADD_RECORD = gql`
mutation createRecord($belongsTo: ID!, $tag: String!, $method: String!, $description: String!, $amount: Float!){
  createRecord(recordInfo: {belongsTo: $belongsTo, amount: $amount, tag: $tag, description: $description, method: $method}){
    belongsTo,
    amount,
    tag,
    date,
    description{
      content,
      date
    }
  }
}
`
export const DELETE_RECORD = gql`
mutation deleteRecord($recordId: ID!){
  deleteRecord(recordId: $recordId){
    description{
      id
    }
  }
}
`
