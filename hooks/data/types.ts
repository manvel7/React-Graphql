interface OperationProps {
	cache?: boolean;
}

export interface MutatationProps extends OperationProps {}

export interface QueryProps extends OperationProps {}
