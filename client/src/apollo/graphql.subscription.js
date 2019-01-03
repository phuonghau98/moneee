import gql from 'graphql-tag'

export const RECORDS_SUBSCRIPTION = gql`
subscription recordCreated($userId: ID!) {
  recordCreated(userId: $userId){
    id
    amount
    method
    tag
    date
    description {
      content
      date
    }
  }
}
`

export const ACCOUNTS_SUBSCRIPTION = gql`
  subscription accountsChanged($userId: ID!){
    accountsChanged(userId: $userId){
      bank
      cc
      cash
    }
  }
`
