type TestComponentProps = {
    value: number;
};

export default function TestComponent ({
    value,
}: TestComponentProps) {
    return (
        <div>
            Test component: {value}
        </div>
    );
}