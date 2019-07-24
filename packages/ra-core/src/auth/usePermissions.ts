import { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import AuthContext from './AuthContext';
import { AUTH_GET_PERMISSIONS } from './types';
import { useSafeSetState } from '../util/hooks';
import { ReduxState } from '../types';

interface State {
    loading: boolean;
    loaded: boolean;
    permissions?: any;
    error?: any;
}

const emptyParams = {};

/**
 * Hook for getting user permissions
 *
 * Calls the authProvider asynchronously with the AUTH_GET_PERMISSIONS verb.
 * If the authProvider returns a rejected promise, returns empty permissions.
 *
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { permissions: [any], loading: false, loaded: true }
 * - error: { error: [error from provider], loading: false, loaded: true }
 *
 * Useful to enable features based on user permissions
 *
 * @param {Object} authParams Any params you want to pass to the authProvider
 *
 * @returns The current auth check state. Destructure as { permissions, error, loading, loaded }.
 *
 * @example
 *     import { usePermissions } from 'react-admin';
 *
 *     const PostDetail = props => {
 *         const { loaded, permissions } = usePermissions();
 *         if (loaded && permissions == 'editor') {
 *             return <PostEdit {...props} />
 *         } else {
 *             return <PostShow {...props} />
 *         }
 *     };
 */
const usePermissions = (authParams = emptyParams) => {
    const [state, setState] = useSafeSetState<State>({
        loading: true,
        loaded: false,
    });
    const location = useSelector((state: ReduxState) => state.router.location);
    const pathname = location && location.pathname;
    const authProvider = useContext(AuthContext);
    useEffect(() => {
        if (!authProvider) {
            setState({ loading: false, loaded: true });
            return;
        }
        authProvider(AUTH_GET_PERMISSIONS, {
            location: pathname,
            ...authParams,
        })
            .then(permissions => {
                setState({ loading: false, loaded: true, permissions });
            })
            .catch(error => {
                setState({
                    loading: false,
                    loaded: true,
                    error,
                });
            });
    }, [authParams, authProvider, pathname]); // eslint-disable-line react-hooks/exhaustive-deps
    return state;
};

export default usePermissions;