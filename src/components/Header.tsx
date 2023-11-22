import styled from 'styled-components';

const StyledHeader = styled.header`
    background-color: #0f52ba;
    padding: 11px 20px;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
`;

export default function Header() {
    return (
        <>
            <StyledHeader>
                <img src='./logo.svg' alt='MKS Sistemas logo' />
            </StyledHeader>
        </>
    );
}
