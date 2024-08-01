import React from 'react';

export async function getServerSideProps(context) {
    const { id } = context.query;
    let data = null

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        data = await res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return { props: { data } }
}

const Index = () => {
    return (
        <div>
            
        </div>
    );
};

export default Index;