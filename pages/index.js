import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export const Input = styled.input`
  padding: 12px; 
  border-radius: 5px;
  border: none; 
  margin: 0 12px 24px 12px;
`
export const Button = styled.button`
  /* background: ${({ theme }) => theme.colors.button}; */
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  padding: 12px;
  margin: 0 12px;
  border-radius: 5px;
  border: none;
  text-transform: uppercase;
`

export const Form = styled.form`
  width: 100%;
  display: flex; 
  justify-content: center; 
  flex-direction: column;
`




export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
      <title>Quizz - Call of Duty</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Call Of Duty</h1>
          </Widget.Header>
          <Widget.Content>
            <Form 
              onSubmit={function (infosDoEvento) {
                infosDoEvento.preventDefault();
                router.push(`/quiz?name=${name}`);
                console.log('Fazendo uma submissão por meio do react');
              }}
            >
              <Input
                onChange={function (infosDoEvento) {
                  console.log(infosDoEvento.target.value);
                  // State
                  // name = infosDoEvento.target.value;
                  setName(infosDoEvento.target.value);
                }}
                placeholder="Diz ai seu nome"
              />
              <Button type="submit" disabled={name.length === 0}>
                <div>
                  Bora Jogar ...
                </div>
                {name}
              </Button>
            </Form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/BrunnoBorges" />
    </QuizBackground>
  );
}