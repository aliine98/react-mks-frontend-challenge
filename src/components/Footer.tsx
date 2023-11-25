import styled from 'styled-components';

const StyledFooter = styled.footer`
    background: #eee;
    padding: 10px;
    text-align: center;
`;

export default function Footer() {
    return (
        <>
            <StyledFooter>MKS Sistemas &copy; Todos os direitos reservados</StyledFooter>
        </>
    );
}
