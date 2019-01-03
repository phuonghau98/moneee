import gql from 'graphql-tag'

export const GET_ACCOUNTS = gql`
query getAccounts($userId: ID!){
  getAccounts(userId: $userId){
    bank
    cc
    cash
  }
}
`
export const GET_RECORDS = gql`
query getRecords($userId: ID!){
  records: getRecord(userId: $userId){
    id
    date
    tag
    amount
    method
    description{
      date
      content
    }
  }
}
`

export const GET_OVERVIEW = gql`
  query overviews($userId: ID!){
    overviews: recordsStaticByDate(userId: $userId){
      today
      thisMonth
      lastMonth
    }
  }
`

export const LOGIN = gql`
  query login($usn: String!, $pwd: String!){
    login(loginInfo: {usn: $usn, pwd: $pwd }){
      token
      id
    }
  }
`
