const Stat: React.FC = () => {

    const memory = (performance as any).memory;

    return <>
        <div className={`stat-container`}>
            Status 
            <li>Memory : {(() => {
                return `${(memory.usedJSHeapSize / 1048576).toLocaleString()} MB`
            })()}</li>

        </div>
    </>
}
export default Stat