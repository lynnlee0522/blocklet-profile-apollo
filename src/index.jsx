import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import i18n from './i18n';
import App from './app';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <ApolloProvider client={client}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </ApolloProvider>
);
