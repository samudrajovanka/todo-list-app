import Link from 'next/link';

import Card from '@/components/elements/Card';
import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import RegisterForm from '@/components/parts/Register/RegisterForm';

const Register = () => {
  return (
    <Container className="min-h-screen flex items-center justify-center">
      <Card>
        <Card.Body>
          <Text as="h2" typography="h2" className="mb-3">Create Account</Text>

          <RegisterForm />

          <Text
            typography="xs"
            className="mt-4"
          >
            You have a account? <Link href="/auth/login" className="link-primary">Login</Link>
          </Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
