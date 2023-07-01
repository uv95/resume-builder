
type Props = {children:React.ReactNode, columns: number}

const Block = ({children,columns}:Props) => {
    const contentStyle = { 
        display: columns === 1 ? 'grid' : 'block',
        gridTemplateColumns: "1fr 3fr",
        gap:"2rem" 
    };

    return (
        <div style={contentStyle}>
            {children}      
        </div>
    
    )
}

export default Block