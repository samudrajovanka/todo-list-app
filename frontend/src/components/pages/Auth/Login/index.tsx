import Link from 'next/link';

import Card from '@/components/elements/Card';
import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import LoginForm from '@/components/parts/Login/LoginForm';

const Login = () => {
  return (
    <Container className="min-h-screen flex items-center justify-center">
      <Card>
        <Card.Body>
          <Text as="h2" typography="h2" className="mb-3">Welcome Back</Text>

          <LoginForm />

          <Text
            typography="xs"
            className="mt-4"
          >
            You don&apos;t have a account? <Link href="/auth/register" className="link-primary">Register</Link>
          </Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
