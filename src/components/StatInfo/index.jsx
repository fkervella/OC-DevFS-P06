function StatInfo({label, value, unit}) {

return (
    <>
    <div className="statInfo">
        <div className="statExplaination">{label}</div>
        <div className="stat"><span className="statValue">{value}h</span><span className="statUnit"> {unit}</span></div>
    </div>
    </>
)
}

export default StatInfo